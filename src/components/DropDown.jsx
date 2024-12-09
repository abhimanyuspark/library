import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";

export default function DropDown({
  options = [],
  value = "",
  onChange = (i) => i,
  field = (i) => i,
  avatar,
  width = "100%",
}) {
  // Templete for showing data in field
  const Templete = ({ value }) => {
    return (
      <>
        {avatar && (
          <img
            alt=""
            src={avatar && avatar(value)}
            className="size-5 shrink-0 rounded-full"
          />
        )}
        <span className="block truncate">{field(value)}</span>
      </>
    );
  };

  return (
    <Listbox value={value} onChange={onChange}>
      <div style={{ width: width }} className="relative transition-none">
        <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-primary focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <Templete value={value} />
          </span>
          <ChevronDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {options?.map((item, index) => (
            <ListboxOption
              key={index}
              value={item}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 bg-white text-gray-900 data-[focus]:bg-primary data-[focus]:text-white data-[focus]:outline-none"
            >
              <div className="flex items-center gap-3">
                <Templete value={item} />
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
