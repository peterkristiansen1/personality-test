interface ResultProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Result({ searchParams }: ResultProps) {
  console.log(searchParams);
  return <h1>Result</h1>;
}
