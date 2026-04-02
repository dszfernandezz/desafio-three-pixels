import { Link } from "react-router-dom";

function HeaderBackLink() {
  return (
    <div className="mb-6 grid-cols-2 flex justify-between">
      <Link
        to="/"
        className="text-purple-600 hover:text-purple-800 flex items-center gap-2 font-medium"
      >
        ... Voltar para o início
      </Link>
    </div>
  );
}

export default HeaderBackLink;
