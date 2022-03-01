const welcomeController = (req, res) => {
  const response = req.t('welcome_message')
  res.status(200).json({ error: false, message: `${response}` })
}

export default welcomeController
