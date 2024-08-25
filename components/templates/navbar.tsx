import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";

export const NavBar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data, status } = useSession();

  const onClickLink = (e: React.MouseEvent<HTMLDivElement>) => {
    const link = e.currentTarget.id;
    link && router.push(link);
    setIsOpen(false);
  };
  return (
    <>
      <div className="navbar">
        <div id="/" className="navbar__logo" onClick={onClickLink}>
          eatmap
        </div>
        <div className="navbar__list">
          <div
            id="/stores"
            className="navbar__list--item"
            onClick={onClickLink}
          >
            맛집 목록
          </div>
          <div
            id="/stores/new"
            className="navbar__list--item"
            onClick={onClickLink}
          >
            맛집 등록
          </div>
          <div
            id="/users/likes"
            className="navbar__list--item"
            onClick={onClickLink}
          >
            찜한 가게
          </div>

          {status === "authenticated" ? (
            <button type="button" onClick={() => signOut()}>
              로그아웃
            </button>
          ) : (
            <div
              id="/api/auth/signin"
              className="navbar__list--item"
              onClick={onClickLink}
            >
              로그인
            </div>
          )}
        </div>
        <div
          role="presentation"
          className="navbar__button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <AiOutlineClose /> : <BiMenu />}
        </div>
      </div>
      {/* 모바일 navbar */}
      {isOpen && (
        <div className="navbar--mobile">
          <div className="navbar__list--mobile">
            <div
              id="/stores"
              className="navbar__list--item"
              onClick={onClickLink}
            >
              맛집 목록
            </div>
            <div
              id="/stores/new"
              className="navbar__list--item"
              onClick={onClickLink}
            >
              맛집 등록
            </div>
            <div
              id="/users/likes"
              className="navbar__list--item"
              onClick={onClickLink}
            >
              찜한 가게
            </div>
            {/* <div id="/api/auth/signin" className="navbar__list--item">
              로그인
            </div> */}
            {status === "authenticated" ? (
              <button type="button" onClick={() => signOut()}>
                로그아웃
              </button>
            ) : (
              <div
                id="/api/auth/signin"
                className="navbar__list--item"
                onClick={onClickLink}
              >
                로그인
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
