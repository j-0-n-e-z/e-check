
// TODO: make origin an Origin type
export const getOriginIcon = (origin: string) => {
  const assetsUrl = 'http://localhost:8080/assets'
  // TODO: refactor make a component OriginIcon
	// TODO: add to prettier setting tailwindFunctions classname or smth like that
  const classname = 'h-10 w-10 inline'
  switch (true) {
    case /животное/.test(origin):
      return (
        <img
          key={origin}
          className={classname}
          src={`${assetsUrl}/animal.png`}
          title={`${origin} происхождение`}
        />
      )
    case /растительное/.test(origin):
      return (
        <img
          key={origin}
          className={classname}
          src={`${assetsUrl}/plant.png`}
          title={`${origin} происхождение`}
        />
      )
    case /искусственное/.test(origin):
      return (
        <img
          key={origin}
          className={classname}
          src={`${assetsUrl}/artificial.png`}
          title={`${origin} происхождение`}
        />
      )
    case /микробиологическое/.test(origin):
      return (
        <img
          key={origin}
          className={classname}
          src={`${assetsUrl}/microbiological.png`}
          title={`${origin} происхождение`}
        />
      )
    case /минеральное/.test(origin):
      return (
        <img
          key={origin}
          className={classname}
          src={`${assetsUrl}/mineral.png`}
          title={`${origin} происхождение`}
        />
      )
    case /синтетическое/.test(origin):
      return (
        <img
          key={origin}
          className={classname}
          src={`${assetsUrl}/synthetic.png`}
          title={`${origin} происхождение`}
        />
      )
    default:
      return null
  }
}
