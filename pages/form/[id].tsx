import { useGetSingleTaskQuery } from "client/generated/graphql";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type Props = {};

const SingleTaskPage = (props: Props) => {
  const router = useRouter();
  console.log(router);
  const { id } = router.query;

  const { data, error, loading } = useGetSingleTaskQuery({
    variables: {
      taskID: id + "",
    },
  });

  return (
    <div>
      SingleTaskPage
      <Link href={"/form"}>
        <b>Back to tasks</b>
      </Link>
      {!!data && JSON.stringify(data)}
      {!!error && error.message}
    </div>
  );
};

export default SingleTaskPage;
