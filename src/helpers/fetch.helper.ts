export async function fetchData(url: string): Promise<string> {
  const headers = new Headers();

  headers.set(
    'User-Agent',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'
  );

  const res = await fetch(url, {
    method: 'GET',
    headers,
  });

  if (res.ok) {
    const data = await res.text(); // HTML raw data
    return data;
  }
  throw new Error("Couldn't fetch data");
}
