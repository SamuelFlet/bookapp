"use client";

import { AuthorField } from "@/app/lib/definitions";
import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { createBook, State } from "@/app/lib/actions";
import { useFormState } from "react-dom";

export default function Form({ authors }: { authors: AuthorField[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createBook, initialState);
  return (
    <form action={dispatch}>
      <div className="mb-4">
        <label htmlFor="author" className="mb-2 block text-sm font-medium">
          Choose author
        </label>
        <div className="relative">
          <select
            id="author"
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
                {author.name}
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
              type="text"
              placeholder="Enter the publication year"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="lang" className="mb-2 block text-sm font-medium">
          Enter Language
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="lang"
              name="lang"
              type="text"
              placeholder="Enter the language"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="lang" className="mb-2 block text-sm font-medium">
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
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <button className="btn" type="submit">
          Create Invoice
        </button>
      </div>
    </form>
  );
}
