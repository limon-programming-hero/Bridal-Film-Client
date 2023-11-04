import { BsFacebook, BsInstagram, BsYoutube } from "react-icons/bs";
const Footer = () => {
  return (
    <div className="p-10 bg-neutral text-neutral-content mt-10">
      <div className="flex mb-10  flex-row justify-center gap-x-8">
        <a className="text-2xl">
          <BsFacebook></BsFacebook>
        </a>
        <a className="text-2xl">
          <BsInstagram></BsInstagram>
        </a>
        <a className="text-2xl">
          <BsYoutube></BsYoutube>
        </a>
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
