"use client";

import { Author } from "@/utils/kysely-types";
import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { createBook,bookState } from "@/app/lib/actions";
import { useFormState } from "react-dom";

export default function Form({ authors }: { authors: { id: number; fullName: string; }[]}) {
  const initialState: bookState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createBook, initialState);
  
  return (
    <form action={dispatch}>
      <div className="mb-4">
        <label htmlFor="authorId" className="mb-2 block text-sm font-medium">
          Choose author
        </label>
        <div className="relative">
          <select
            id="authorId"
            name="authorId"
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue=""
            aria-describedby="author-error"
          >
            <option value="" disabled>
              Select a author
            </option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.fullName}
              </option>
            ))}
          </select>
          <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
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
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
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
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
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
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <button className="btn" type="submit">
          Create Invoice
        </button>
      </div>
    </form>
  );
}
