export type UniversalSearchOption = {
  id: string;
  title: string;
  subtitle?: string;
  meta?: string;
};

export type UniversalSearchDropdownProps = {
  isLoading: boolean;
  options: UniversalSearchOption[];
  statusMessage: string;
  loadingLabel: string;
  minCharacters: number;
  trimmedValueLength: number;
  onOptionMouseDown: (
    event: React.MouseEvent<HTMLButtonElement>,
    option: UniversalSearchOption
  ) => void;
};

export type UniversalSearchStatusText = {
  idle: string;
  loading: string;
  empty: string;
  minChars: string;
  error: string;
};

export type UniversalSearchInputProps = {
  value: string;
  onValueChange: (value: string) => void;
  onSelect: (option: UniversalSearchOption) => void;
  fetchResults: (query: string) => Promise<UniversalSearchOption[]>;
  placeholder?: string;
  minCharacters?: number;
  inputId?: string;
  onBlur?: () => void;
  className?: string;
  statusText: UniversalSearchStatusText;
};
