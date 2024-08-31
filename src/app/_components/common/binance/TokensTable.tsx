"use client";

import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { API_BASE_URL } from '@/utils/api';
import Loading from '../loading/Loading';
import useFetch from '@/hooks/useFetch';
import { getTokenFromStorage } from '@/context/AuthContext';
// import BinanceConnectStatus from './BinanceConnectStatus';

export default function TokensTable() {
  const accessToken = getTokenFromStorage("access_token");
  const [rowData, setRowData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = 5;

  const { data: assetData, loading: assetLoading } = useFetch(`${API_BASE_URL}/users/me/assets`, {
    method: 'GET',
    headers: {
      'authorization': `Bearer ${accessToken}`,
    },
  });

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  useEffect(() => {
    if (assetData && assetData.length > 0) {
      const fetchTickers = assetData.map((asset: any) =>
        fetch(`${API_BASE_URL}/binance/${asset.symbol}/ticker`, {
          method: 'GET',
          headers: {
            'authorization': `Bearer ${accessToken}`,
          },
        })
          .then(response => response.json())
          .then(data => ({
            symbol: asset.symbol,
            quantity: asset.quantity,
            price_change_percent: data.data?.price_change_percent || 'N/A',
            last_price: data.data?.last_price || 'N/A',
          }))
      );

      Promise.all(fetchTickers)
        .then(results => {
          setRowData(results);
        })
        .catch(() => {
          // Handle errors here
        });
    }
  }, [assetData, accessToken]);

  // Calculate data to be displayed on the current page
  const offset = currentPage * itemsPerPage;
  const currentData = rowData.slice(offset, offset + itemsPerPage);

  // if (detail === "User OAuth not linked.") {
  //   return <BinanceConnectStatus />
  // }
  if (assetLoading || !rowData.length) {
    return <Loading />;
  }
  // console.log(detail);
  return (
    <>
      <div className="my-5 overflow-x-auto">
        <table className="min-w-full bg-white border overflow-auto">
          <thead>
            <tr>
              <th className="py-2 px-4 border text-start">Symbol</th>
              <th className="py-2 px-4 border text-start">Quantity</th>
              <th className="py-2 px-4 border text-start">Price Change Percent</th>
              <th className="py-2 px-4 border text-start">Last Price</th>
            </tr>
          </thead>
          <tbody className='overflow-auto'>
            {currentData.map((item: any, index: number) => (
              <tr key={index} className={`${index % 2 == 0 && 'bg-gray-100'}`}>
                <td className="py-2 px-4 border uppercase">{item.symbol}</td>
                <td className="py-2 px-4 border">{item.quantity}</td>
                <td className={`py-2 px-4 border  ${item.price_change_percent > 0 ? 'text-primary-700' : 'text-red-600'}`}>{item.price_change_percent}</td>
                <td className="py-2 px-4 border">{item.last_price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={Math.ceil(rowData.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"flex justify-end mt-4"}
          pageClassName={"mx-1"}
          activeClassName={"font-bold"}
          previousClassName={"mx-1"}
          nextClassName={"mx-1"}
        />
      </div>
    </>
  );
}
