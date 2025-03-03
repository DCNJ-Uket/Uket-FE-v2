import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { Twitter } from "next/dist/lib/metadata/types/twitter-types";

export const Base_Title = "Uket";
export const Base_Description =
  "Uket을 이용해 축제/공연을 웨이팅 없이 즐겨보세요!";
const Base_Url = "https://uket.site";
const Base_Image_Url =
  "https://res.cloudinary.com/dhn3axbhj/image/upload/f_auto,q_auto/nt7u0nxxijucwh8jjdb8";

const Base_OpenGraph: OpenGraph = {
  title: Base_Title,
  description: Base_Description,
  siteName: Base_Title,
  locale: "ko_KR",
  type: "website",
  url: Base_Url,
  images: {
    url: Base_Image_Url,
  },
};

const Base_Twitter: Twitter = {
  title: Base_Title,
  description: Base_Description,
  images: {
    url: Base_Image_Url,
  },
  card: "summary_large_image",
};

type SiteConfig = {
  title: string;
  description: string;
  openGraph: OpenGraph;
  twitter: Twitter;
};

export const Base_Site_Config: SiteConfig = {
  title: Base_Title,
  description: Base_Description,
  openGraph: Base_OpenGraph,
  twitter: Base_Twitter,
};

export const Select_Event_Site_Config: SiteConfig = {
  ...Base_Site_Config,
  title: `${Base_Title} | 둘러보기`,
  openGraph: {
    title: `${Base_Title} | 둘러보기`,
    siteName: `${Base_Title} | 둘러보기`,
    url: `${Base_Url}/select-event`,
    ...Base_OpenGraph,
  },
  twitter: {
    title: `${Base_Title} | 둘러보기`,
    ...Base_Twitter,
  },
};

export const Auth_Site_Config: SiteConfig = {
  ...Base_Site_Config,
  title: `${Base_Title} | 로그인`,
  openGraph: {
    title: `${Base_Title} | 로그인`,
    siteName: `${Base_Title} | 로그인`,
    url: `${Base_Url}/login`,
    ...Base_OpenGraph,
  },
  twitter: {
    title: `${Base_Title} | 로그인`,
    ...Base_Twitter,
  },
};
