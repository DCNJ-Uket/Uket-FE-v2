import { SearchType } from "@uket/api/types/admin-ticket";
import { Input } from "@uket/ui/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@uket/ui/components/ui/select";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const SEARCH_OPTIONS: Array<{
  value: SearchType;
  label: string;
}> = [
  {
    value: "USER_NAME",
    label: "입금자명",
  },
  {
    value: "PHONE_NUMBER",
    label: "전화번호 뒷자리",
  },
  {
    value: "SHOW_DATE",
    label: "티켓 날짜(YY.MM.DD)",
  },
  // {
  //   value: "RESERVATION_USER_TYPE",
  //   label: "사용자 구분",
  // },
  {
    value: "STATUS",
    label: "티켓 상태",
  },
];

interface SearchInputProps {
  onSearchTicket: (type: SearchType, value: string) => void;
}

export default function SearchInput({ onSearchTicket }: SearchInputProps) {
  const searchParams = useSearchParams();
  const [searchType, setSearchType] = useState<SearchType>(
    (searchParams.get("searchType") as SearchType) || "USER_NAME",
  );
  const [searchValue, setSearchValue] = useState(
    searchParams.get("searchValue") || "",
  );

  const handleSearch = () => {
    if (searchValue.trim()) {
      onSearchTicket(searchType, searchValue);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const currentOption = SEARCH_OPTIONS.find(
    option => option.value === searchType,
  );

  return (
    <aside>
      <section
        className="flex"
        style={{
          boxShadow: "1px 1px 10px 0px #0000000F",
        }}
      >
        <Select
          value={searchType}
          onValueChange={value => setSearchType(value as SearchType)}
        >
          <SelectTrigger className="bg-formInput min-w-48 gap-2 rounded-l-lg text-black">
            <SelectValue placeholder={currentOption?.label} />
          </SelectTrigger>
          <SelectContent>
            {SEARCH_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          isIcon
          iconClick={handleSearch}
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-44 rounded-none rounded-r-lg border-none ring-offset-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </section>
    </aside>
  );
}
