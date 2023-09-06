export const getOriginIcon = (origin: string) => {
	const assetsPath = 'http://localhost:8080/assets'
	// TODO: add to prettier setting tailwindFunctions classname or smth like that
  const classname = 'h-10 w-10 inline'
  switch (true) {
    case /животное/.test(origin):
      return (
        <img
          key={origin}
          className={classname}
          src={`${assetsPath}/animal.png`}
          title={`${origin} происхождение`}
        />
      )
    case /растительное/.test(origin):
      return (
        <img
          key={origin}
          className={classname}
          src={`${assetsPath}/plant.png`}
          title={`${origin} происхождение`}
        />
      )
    case /искусственное/.test(origin):
      return (
        <img
          key={origin}
          className={classname}
          src={`${assetsPath}/artificial.png`}
          title={`${origin} происхождение`}
        />
      )
    case /микробиологическое/.test(origin):
      return (
        <img
          key={origin}
          className={classname}
          src={`${assetsPath}/microbiological.png`}
          title={`${origin} происхождение`}
        />
      )
    case /минеральное/.test(origin):
      return (
        <img
          key={origin}
          className={classname}
          src={`${assetsPath}/mineral.png`}
          title={`${origin} происхождение`}
        />
      )
    case /синтетическое/.test(origin):
      return (
        <img
          key={origin}
          className={classname}
          src={`${assetsPath}/synthetic.png`}
          title={`${origin} происхождение`}
        />
      )
    default:
      return null
  }
}
