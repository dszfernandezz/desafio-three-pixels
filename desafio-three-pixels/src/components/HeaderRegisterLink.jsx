import { Link } from "react-router-dom";

function HeaderRegisterLink() {
  return (
    <div className="mb-6 grid-cols-2 flex justify-between">
      <Link
        to="/registrar"
        className="text-purple-600 hover:text-purple-800 flex items-center gap-2 font-medium"
      >
        Registrar-se
      </Link>
    </div>
  );
}

export default HeaderRegisterLink;
