interface MetchParameters {
  body?: unknown;
  method?: 'GET' | 'POST';
  path: string;
}

export const metch = <T>({ body, method, path }: MetchParameters) =>
  fetch(path, {
    body: JSON.stringify(body),
    method,
  }).then<T>((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('metch failed');
  });
