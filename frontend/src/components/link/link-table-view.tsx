import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetchAllLinksQuery } from "../../redux/apis/LinkApi";

const formatDate = (d?: string | null) =>
  d ? new Date(d).toLocaleString() : "-";

function LinkTableView() {
  const { data: links = [], isLoading, isError } = useFetchAllLinksQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading links.</div>;
  }

  function rows() {
    return links.map((link) => (
      <TableRow key={link.id}>
        <TableCell className="font-medium whitespace-normal  break-all w-[50rem]">
          <a
            href={link.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline break-all"
          >
            {link.originalUrl}
          </a>
        </TableCell>
        <TableCell className="font-medium whitespace-normal break-all w-[30rem]">
          <a
            href={link.shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline break-all"
          >
            {link.shortUrl}
          </a>
        </TableCell>
        <TableCell className="font-medium whitespace-normal break-all w-[20rem]">
          {formatDate(link.createdAt.toString())}
        </TableCell>
      </TableRow>
    ));
  }

  return (
    <Table>
      <TableCaption>A list of your links.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Original Url</TableHead>
          <TableHead>Shorten Url</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{rows()}</TableBody>
    </Table>
  );
}

export default LinkTableView;
