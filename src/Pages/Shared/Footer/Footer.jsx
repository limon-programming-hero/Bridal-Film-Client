import { BsFacebook, BsInstagram, BsYoutube } from "react-icons/bs";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="p-10 bg-neutral text-neutral-content mt-10">
      <div className="flex mb-10  flex-row justify-center gap-x-8">
        <Link
          target="_blank"
          to="https://www.facebook.com"
          className="text-2xl hover:scale-125 focus:scale-75"
        >
          <BsFacebook></BsFacebook>
        </Link>
        <Link
          target="_blank"
          to="https://www.instagram.com/"
          className="text-2xl hover:scale-125 focus:scale-75"
        >
          <BsInstagram></BsInstagram>
        </Link>
        <Link
          target="_blank"
          to="https://www.youtube.com/"
          className="text-2xl hover:scale-125 focus:scale-75"
        >
          <BsYoutube></BsYoutube>
        </Link>
      </div>
      <div className="divider"></div>
      <footer className="footer">
        <nav>
          <header className="footer-title text-2xl">Bridal Film</header>
          <p>
            The world without photography will be <br />
            meaningless to us if there is no light and color,
            <br />
            which opens up our minds and expresses passion.
          </p>
        </nav>
        <nav>
          <header className="footer-title">Company</header>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <header className="footer-title">Social</header>
          <a className="link link-hover"> Contacts: 0172211++++</a>
          <a className="link link-hover">Email: support@bridal-film.com</a>
        </nav>
      </footer>
      <aside className="mt-8 text-center">
        <p>Copyright © 2023 - All right reserved by Bridal Film</p>
      </aside>
    </div>
  );
};

export default Footer;
