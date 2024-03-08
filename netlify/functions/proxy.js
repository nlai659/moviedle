import axios from "axios"

export const handler = async () => {
	try {
		const response = await axios.get('https://api.github.com/users/nlai659')
		return {
			statusCode: 200,
			body: JSON.stringify(response.data)
		}
	
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: 'Failed fetching data' })
		}
	}
}