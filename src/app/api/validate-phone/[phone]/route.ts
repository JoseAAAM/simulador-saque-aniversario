const apiKey = process.env.PHONE_VALIDATION_API_KEY ?? ''

export async function GET(_: Request, { params }: { params: Promise<{ phone: string }> }) {
  try {
    const { phone } = await params

    const response = await fetch(`https://phonevalidation.abstractapi.com/v1/?api_key=${apiKey}&phone=55${phone}`)

    const data = await response.json()

    return Response.json({
      valid: data.valid,
    })
  } catch {
    return Response.json(
      {
        success: false,
        error: 'Erro ao validar telefone',
      },
      { status: 500 }
    )
  }
}