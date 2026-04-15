"use client";

import { Select, MenuItem } from "@mui/material";

type Props = {
  year: number | null;
  setYear: (year: number | null) => void;
};

export function YearFilter({ year, setYear }: Props) {
  const currentYear = new Date().getFullYear();

  const years = Array.from(
    { length: currentYear - 1994 + 1 },
    (_, i) => currentYear - i,
  );

  return (
    <Select
      value={year ?? ""}
      onChange={(e) => {
        const value = e.target.value;
        setYear(value === "" ? null : Number(value));
      }}
      displayEmpty
    >
      <MenuItem value="">Selecione um ano</MenuItem>

      {years.map((y) => (
        <MenuItem key={y} value={y}>
          {y}
        </MenuItem>
      ))}
    </Select>
  );
}
