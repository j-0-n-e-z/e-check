export const getOriginIcon = (origin: string) => {
	const assetsPath = 'http://localhost:8080/assets'
	switch (true) {
		case /животное/.test(origin):
			return (
				<img key={origin} src={`${assetsPath}/animal.png`} title={origin} />
			)
		case /растительное/.test(origin):
			return <img key={origin} src={`${assetsPath}/plant.png`} title={origin} />
		case /искусственное/.test(origin):
			return (
				<img key={origin} src={`${assetsPath}/artificial.png`} title={origin} />
			)
		case /микробиологическое/.test(origin):
			return (
				<img
					key={origin}
					src={`${assetsPath}/microbiological.png`}
					title={origin}
				/>
			)
		case /минеральное/.test(origin):
			return (
				<img key={origin} src={`${assetsPath}/mineral.png`} title={origin} />
			)
		case /синтетическое/.test(origin):
			return (
				<img key={origin} src={`${assetsPath}/synthetic.png`} title={origin} />
			)
		default: 
			return null
	}
}
