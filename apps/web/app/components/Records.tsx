import type { EncodeDataAttributeCallback } from "@sanity/react-loader";
import { Link } from "react-router";

import { RecordCover } from "~/components/RecordCover";
import { STUDIO_BASEPATH } from "~/sanity/constants";
import type { RecordStub } from "~/types/record";

type RecordsProps = {
  records: RecordStub[];
  encodeDataAttribute?: EncodeDataAttributeCallback;
};

export function Records(props: RecordsProps) {
  const { records = [], encodeDataAttribute } = props;

  return records.length > 0 ? (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-12">
      {records.map((record, recordI) => (
        <li className="group relative flex flex-col" key={record._id}>
          <div
            className="relative overflow-hidden transition-all duration-200 ease-in-out group-hover:scale-105 group-hover:opacity-90"
            data-sanity={encodeDataAttribute?.([recordI, "image"])}
          >
            <div className="-rotate-45 absolute z-0 h-48 w-[200%] translate-x-20 translate-y-20 bg-gradient-to-b from-white to-transparent opacity-25 mix-blend-overlay transition-transform duration-500 ease-in-out group-hover:translate-x-10 group-hover:translate-y-10 group-hover:opacity-75" />
            {record?.slug ? (
              <Link prefetch="intent" to={`/records/${record?.slug}`}>
                <RecordCover image={record.image} />
              </Link>
            ) : (
              <RecordCover image={record.image} />
            )}
          </div>
          <div className="flex flex-col">
            {record?.slug ? (
              <Link
                className="pt-4 font-bold text-bold text-xl tracking-tighter transition-colors duration-100 ease-in-out hover:bg-cyan-400 hover:text-white lg:text-3xl"
                prefetch="intent"
                to={`/records/${record?.slug}`}
              >
                {record.title}
              </Link>
            ) : (
              <span className="pt-4 font-bold text-xl tracking-tighter">
                {record.title}
              </span>
            )}
            {record?.artist ? (
              <span className="bg-black font-bold text-white leading-none tracking-tighter dark:bg-white dark:text-black">
                {record.artist}
              </span>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <div className="prose prose-xl mx-auto bg-green-50 p-4">
      <p>No records found, yet!</p>
      <p>
        <a href={STUDIO_BASEPATH}>Log in to your Sanity Studio</a> and start
        creating content!
      </p>
      <p>Or, run </p>
      <pre>
        <code>
          npx sanity@latest exec ./scripts/createData.ts --with-user-token
        </code>
      </pre>
      <p>
        from the command line to delete existing documents populate the site
        with content.{" "}
      </p>
    </div>
  );
}
