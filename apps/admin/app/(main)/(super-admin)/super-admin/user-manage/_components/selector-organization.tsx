import { FormControl } from "@ui/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@ui/components/ui/select";
import { useQueryOrganizationList } from "@uket/api/queries/admin-user";
import { ControllerRenderProps } from "react-hook-form";
import { NewAdminFormSchemaType } from "../../../../../../hooks/use-new-admin-form";

// TODO: 소속 목록 API 연동
export default function SelectorOrganization({
  field,
}: {
  field: ControllerRenderProps<NewAdminFormSchemaType, "organization">;
}) {
  const { data } = useQueryOrganizationList();

  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger className="border border-formInput rounded-md text-[#8989a1]">
          <SelectValue placeholder="선택" />
        </SelectTrigger>
      </FormControl>
      <SelectContent className="border border-formInput">
        <SelectGroup>
          <SelectLabel>선택</SelectLabel>
          {data &&
            data.map(({ organizationId, name }) => (
              <SelectItem key={organizationId} value={name}>
                {name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
