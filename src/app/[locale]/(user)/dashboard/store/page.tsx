"use client"
import { API_BASE_URL } from "@/utils/api";
import useFetch from "@/hooks/useFetch";
import Loading from "@/app/_components/common/loading/Loading";
import Strategies from "@/app/_components/strategies/Strategies";
import { useLocale } from 'next-intl';

export default function Page() {

   return (
      <Strategies />
   );
}
