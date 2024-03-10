const mockPetCardData = [
	{
		id: 1, 
		avatar: 'https://via.placeholder.com/200',
		nome: 'Fido',
		cidade: 'Curitiba',
		imagens: [
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
		],
		tipo: 'Cachorro',
		sexo: 'macho',
		idade: '2 anos',
		porte: 'Médio',
		raca: 'Vira-lata',
		protetor: 'Protetor XYZ',
		convivio: 'Convive bem com outros animais',
		personalidade: 'Brincalhão e carinhoso',
		descricao: 'Fido é um cachorro adorável em busca de um lar. Ele adora brincar e está pronto para ser o seu melhor amigo!',
	},
	{
		id: 2, 
		avatar: 'https://via.placeholder.com/200',
		nome: 'Luna',
		cidade: 'Curitiba',
		imagens: [
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
		],
		tipo: 'Gato',
		sexo: 'fêmea',
		idade: '1 ano',
		porte: 'Pequeno',
		raca: 'Siamês',
		protetor: 'Protetor ABC',
		convivio: 'Prefere ser o único animal da casa',
		personalidade: 'Calma e independente',
		descricao: 'Luna é uma gatinha adorável que gosta de tranquilidade. Ela procura um lar acolhedor onde possa ser a rainha do pedaço!',
	},
	{
		id: 3, 
		avatar: 'https://via.placeholder.com/200',
		nome: 'Luna',
		cidade: 'Curitiba',
		imagens: [
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
		],
		tipo: 'Gato',
		sexo: 'fêmea',
		idade: '1 ano',
		porte: 'Pequeno',
		raca: 'Siamês',
		protetor: 'Protetor ABC',
		convivio: 'Prefere ser o único animal da casa',
		personalidade: 'Calma e independente',
		descricao: 'Luna é uma gatinha adorável que gosta de tranquilidade. Ela procura um lar acolhedor onde possa ser a rainha do pedaço!',
	},
	{
		id: 4, 
		avatar: 'https://via.placeholder.com/200',
		nome: 'Luna',
		cidade: 'Curitiba',
		imagens: [
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
		],
		tipo: 'Gato',
		sexo: 'fêmea',
		idade: '1 ano',
		porte: 'Pequeno',
		raca: 'Siamês',
		protetor: 'Protetor ABC',
		convivio: 'Prefere ser o único animal da casa',
		personalidade: 'Calma e independente',
		descricao: 'Luna é uma gatinha adorável que gosta de tranquilidade. Ela procura um lar acolhedor onde possa ser a rainha do pedaço!',
	},
	{
		id: 5, 
		avatar: 'https://via.placeholder.com/200',
		nome: 'Luna',
		cidade: 'Curitiba',
		imagens: [
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
		],
		tipo: 'Gato',
		sexo: 'fêmea',
		idade: '1 ano',
		porte: 'Pequeno',
		raca: 'Siamês',
		protetor: 'Protetor ABC',
		convivio: 'Prefere ser o único animal da casa',
		personalidade: 'Calma e independente',
		descricao: 'Luna é uma gatinha adorável que gosta de tranquilidade. Ela procura um lar acolhedor onde possa ser a rainha do pedaço!',
	},
	{
		id: 6, 
		avatar: 'https://via.placeholder.com/200',
		nome: 'Luna',
		cidade: 'Curitiba',
		imagens: [
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
		],
		tipo: 'Gato',
		sexo: 'fêmea',
		idade: '1 ano',
		porte: 'Pequeno',
		raca: 'Siamês',
		protetor: 'Protetor ABC',
		convivio: 'Prefere ser o único animal da casa',
		personalidade: 'Calma e independente',
		descricao: 'Luna é uma gatinha adorável que gosta de tranquilidade. Ela procura um lar acolhedor onde possa ser a rainha do pedaço!',
	},
	{
		id: 7,
		avatar: 'https://via.placeholder.com/200',
		nome: 'Luna',
		cidade: 'Curitiba',
		imagens: [
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
		],
		tipo: 'Gato',
		sexo: 'fêmea',
		idade: '1 ano',
		porte: 'Pequeno',
		raca: 'Siamês',
		protetor: 'Protetor ABC',
		convivio: 'Prefere ser o único animal da casa',
		personalidade: 'Calma e independente',
		descricao: 'Luna é uma gatinha adorável que gosta de tranquilidade. Ela procura um lar acolhedor onde possa ser a rainha do pedaço!',
	},
	{
		id: 8,
		avatar: 'https://via.placeholder.com/200',
		nome: 'Luna',
		cidade: 'Curitiba',
		imagens: [
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
		],
		tipo: 'Gato',
		sexo: 'fêmea',
		idade: '1 ano',
		porte: 'Pequeno',
		raca: 'Siamês',
		protetor: 'Protetor ABC',
		convivio: 'Prefere ser o único animal da casa',
		personalidade: 'Calma e independente',
		descricao: 'Luna é uma gatinha adorável que gosta de tranquilidade. Ela procura um lar acolhedor onde possa ser a rainha do pedaço!',
	},
	{
		id: 9,
		avatar: 'https://via.placeholder.com/200',
		nome: 'Luna',
		cidade: 'Curitiba',
		imagens: [
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
		],
		tipo: 'Gato',
		sexo: 'fêmea',
		idade: '1 ano',
		porte: 'Pequeno',
		raca: 'Siamês',
		protetor: 'Protetor ABC',
		convivio: 'Prefere ser o único animal da casa',
		personalidade: 'Calma e independente',
		descricao: 'Luna é uma gatinha adorável que gosta de tranquilidade. Ela procura um lar acolhedor onde possa ser a rainha do pedaço!',
	},
	{
		id: 10,
		avatar: 'https://via.placeholder.com/200',
		nome: 'Luna',
		cidade: 'Curitiba',
		imagens: [
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
		],
		tipo: 'Gato',
		sexo: 'fêmea',
		idade: '1 ano',
		porte: 'Pequeno',
		raca: 'Siamês',
		protetor: 'Protetor ABC',
		convivio: 'Prefere ser o único animal da casa',
		personalidade: 'Calma e independente',
		descricao: 'Luna é uma gatinha adorável que gosta de tranquilidade. Ela procura um lar acolhedor onde possa ser a rainha do pedaço!',
	},
	{
		id: 11,
		avatar: 'https://via.placeholder.com/200',
		nome: 'Luna',
		cidade: 'Curitiba',
		imagens: [
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
		],
		tipo: 'Gato',
		sexo: 'fêmea',
		idade: '1 ano',
		porte: 'Pequeno',
		raca: 'Siamês',
		protetor: 'Protetor ABC',
		convivio: 'Prefere ser o único animal da casa',
		personalidade: 'Calma e independente',
		descricao: 'Luna é uma gatinha adorável que gosta de tranquilidade. Ela procura um lar acolhedor onde possa ser a rainha do pedaço!',
	},
	{
		id: 12,
		avatar: 'https://via.placeholder.com/200',
		nome: 'Luna',
		cidade: 'Curitiba',
		imagens: [
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
		],
		tipo: 'Gato',
		sexo: 'fêmea',
		idade: '1 ano',
		porte: 'Pequeno',
		raca: 'Siamês',
		protetor: 'Protetor ABC',
		convivio: 'Prefere ser o único animal da casa',
		personalidade: 'Calma e independente',
		descricao: 'Luna é uma gatinha adorável que gosta de tranquilidade. Ela procura um lar acolhedor onde possa ser a rainha do pedaço!',
	},
	{
		id: 13,
		avatar: 'https://via.placeholder.com/200',
		nome: 'Luna',
		cidade: 'Curitiba',
		imagens: [
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
		],
		tipo: 'Gato',
		sexo: 'fêmea',
		idade: '1 ano',
		porte: 'Pequeno',
		raca: 'Siamês',
		protetor: 'Protetor ABC',
		convivio: 'Prefere ser o único animal da casa',
		personalidade: 'Calma e independente',
		descricao: 'Luna é uma gatinha adorável que gosta de tranquilidade. Ela procura um lar acolhedor onde possa ser a rainha do pedaço!',
	},
	{
		id: 14,
		avatar: 'https://via.placeholder.com/200',
		nome: 'Luna',
		cidade: 'Curitiba',
		imagens: [
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
		],
		tipo: 'Gato',
		sexo: 'fêmea',
		idade: '1 ano',
		porte: 'Pequeno',
		raca: 'Siamês',
		protetor: 'Protetor ABC',
		convivio: 'Prefere ser o único animal da casa',
		personalidade: 'Calma e independente',
		descricao: 'Luna é uma gatinha adorável que gosta de tranquilidade. Ela procura um lar acolhedor onde possa ser a rainha do pedaço!',
	},
	{
		id: 15,
		avatar: 'https://via.placeholder.com/200',
		nome: 'Luna',
		cidade: 'Curitiba',
		imagens: [
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
			'https://via.placeholder.com/300',
		],
		tipo: 'Gato',
		sexo: 'fêmea',
		idade: '1 ano',
		porte: 'Pequeno',
		raca: 'Siamês',
		protetor: 'Protetor ABC',
		convivio: 'Prefere ser o único animal da casa',
		personalidade: 'Calma e independente',
		descricao: 'Luna é uma gatinha adorável que gosta de tranquilidade. Ela procura um lar acolhedor onde possa ser a rainha do pedaço!',
	}
];

export default mockPetCardData;