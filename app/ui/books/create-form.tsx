"use client";

import Link from "next/link";
import { createBook, bookState } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import Select from "react-select";

export default function Form({
  authors,
}: {
  authors: { id: number; fullName: string }[];
}) {
  const initialState: bookState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createBook, initialState);
  const options = authors.map((author) => ({
    value: author.id,
    label: author.fullName,
  }));

  return (
    <form action={dispatch}>
      <div className="mb-4">
        <label htmlFor="authorId" className="mb-2 block text-sm font-medium">
          Choose author
        </label>
        <div>
          <Select id="authorId" name="authorId" options={options} />
        </div>
        <div id="customer-error" aria-live="polite" aria-atomic="true">
          {state.errors?.authorId &&
            state.errors.authorId.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="title" className="mb-2 block text-sm font-medium">
          Title
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter book title"
              className="peer block  input input-bordered"
              required
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="pubYear" className="mb-2 block text-sm font-medium">
          Publication Year
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="pubYear"
              name="pubYear"
              type="number"
              placeholder="Enter the publication year"
              className="peer block  input input-bordered"
              required
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="img" className="mb-2 block text-sm font-medium">
          Enter a direct image URL
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="img"
              name="img"
              type="text"
              placeholder="Enter the img url"
              className="peer block  input input-bordered"
              required
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link className="btn" href={"/books"}>
          Cancel
        </Link>
        <button className="btn" type="submit">
          Create Invoice
        </button>
      </div>
    </form>
  );
}
