export default function Login() {
  return (
    <div className="w-full sm:w-96 mx-auto lg:mt-28">
      <h1 className="text-xl text-zinc-50 mb-3 text-center font-bold">
        Portfólio Login
      </h1>
      <section className="w-full flex p-4 border border-solid border-zinc-300/[0.18] rounded">
        <form className="flex flex-col gap-7 w-full">
          <div className="w-full">
            <label htmlFor="email" className="text-sm font-bold">
              E-mail
            </label>
            <input
              id="email"
              type="text"
              className="w-full py-2 bg-transparent border-b border-solid border-b-zinc-400 text-zinc-300 outline-none"
              placeholder="ex: você@exemplo.com.br"
              autoFocus
            />
          </div>
          <div className="w-full">
            <label htmlFor="senha" className="text-sm font-bold">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              className="w-full py-2 bg-transparent border-b border-solid border-b-zinc-400 text-zinc-300 outline-none"
              placeholder="••••••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-zinc-200 text-zinc-900 rounded font-bold"
          >
            Entrar
          </button>
        </form>
      </section>
    </div>
  );
}