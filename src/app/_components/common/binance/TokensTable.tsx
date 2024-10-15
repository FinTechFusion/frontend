"use client";
import ReactPaginate from 'react-paginate';
import { FaSpinner } from "react-icons/fa6";
import { useAssetData } from '@/context/AssetsContext';
import { useAuth } from '@/context/AuthContext';
import { useTranslations } from 'next-intl';

export default function TokensTable() {
  const { user } = useAuth();
  const { assetData,assetLoading, counts, handlePageClick, currentPage } = useAssetData();
  const t = useTranslations("dashboard");

  return (
    <>
      <h2 className="text-2xl mb-5 mt-2 font-medium border-b-2 border-primary-600 w-fit p-1">
        {user?.is_demo ? t("DemoSpotWallet") : t("spotWallet")}
      </h2>
      <div className="my-5 overflow-x-scroll overflow-y-hidden md:overflow-hidden">
        <table className="min-w-full bg-white border shadow-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border text-start">{t("symbol")}</th>
              <th className="py-2 px-4 border text-start">{t("quantity")}</th>
              <th className="py-2 px-4 border text-start">{t("price_change")}</th>
              <th className="py-2 px-4 border text-start">{t("LastPrice")}</th>
              <th className="py-2 px-4 border text-start">{t("total")}</th>
            </tr>
          </thead>
          <tbody className='table-body'>
            {assetLoading ? (
              <tr>
                <td colSpan={5}>
                  <div className="flex justify-center items-center h-64">
                    <FaSpinner className="spinner text-primary-600 w-8 h-8" />
                  </div>
                </td>
              </tr>
            ) : (
              assetData?.map((item: any, index: number) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                  <td className="py-2 px-4 border uppercase">{item.symbol}</td>
                  <td className="py-2 px-4 border">{item.quantity}</td>
                  <td className={`py-2 px-4 border ${item.price_change_percent > 0 ? 'text-primary-700' : 'text-red-600'}`}>
                    {item.price_change_percent}
                  </td>
                  <td className="py-2 px-4 border">{item.last_price}</td>
                  <td className="py-2 px-4 border">{(item.quantity * item.last_price).toFixed(3)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <ReactPaginate
          previousLabel={t("previous")}
          nextLabel={t("next")}
          breakLabel={"..."}
          pageCount={Math.ceil(counts / 5)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"flex justify-end mt-4"}
          pageClassName={"mx-1"}
          activeClassName={"font-bold bg-primary-600 w-6 h-6 text-secondary rounded-full flex justify-center items-center"}
          previousClassName={"mx-1"}
          nextClassName={"mx-1"}
          forcePage={currentPage}
        />
      </div>
    </>
  );
}
