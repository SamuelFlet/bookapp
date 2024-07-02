"use client";
import { createAuthor, authorState } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { lusitana } from "../fonts";

export default function CreateAuthor() {
  const initialState: authorState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createAuthor, initialState);

  return (
    <form action={dispatch} className={`${lusitana.className}`}>
      <div className="space-y-3">
        <label className="input input-bordered flex items-center gap-2">
          Name
          <input
            type="text"
            className="grow"
            id="fullName"
            name="fullName"
            placeholder="Enter the authors full name"
            required
          />
        </label>
      </div>
      <button type="submit" className="btn">
        Submit Author
      </button>
    </form>
  );
}
