interface ListWrapperPops {
  children: React.ReactNode;
}

export const ListWrapper = ({ children }: ListWrapperPops) => {
  return <li className="shrink-0 h-full w-[272px] select-none">{children}</li>;
};
