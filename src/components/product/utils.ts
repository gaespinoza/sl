"use client";

export interface Product {
  title: string;
  image: string;
  subtitle: string;
  id: string;
}

export async function chunk<T>(array: T[], size: number): Promise<T[][]> {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  const end = await chunk(tail, size);
  return [head, ...end];
}
