interface CampoCPFProps {
  username: string;
  setUsername: (value: string) => void;
  userExist: boolean;
  loading: boolean;
}

function CampoCPF({
    username,
    setUsername,
    userExist,
    loading,
}: CampoCPFProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">CPF</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={userExist || loading}
        placeholder="000.000.000-00"
        className="w-full px-4 py-3 rounded-lg border border-gray-300 mb-3"
      />
    </div>
  );
}

export default CampoCPF;
