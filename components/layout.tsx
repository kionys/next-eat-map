import { NavBar } from "./templates/navbar";
interface IPropsLayout {
  children: React.ReactNode;
}

export const Layout = ({ children }: IPropsLayout) => {
  return (
    <div className="layout">
      <NavBar />
      {children}
    </div>
  );
};
