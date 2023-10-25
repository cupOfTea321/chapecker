import PrimitivePaper from '../../../components/PrimitivePaper/PrimitivePaper'
import './ErrorPage.scss'
import svg from './bad_mood_emoji.png'
import Link from '@mui/material/Link'

type OwnProps = {
  error: {
    errorCode: string
    comment: string
  }
}

const ErrorPage = ({ error }: OwnProps) => {
  return (
    <PrimitivePaper class="error-page">
      <h1 className="error-page__error-code">
        <img src={svg} alt="Ошибка" />
        {error.errorCode}
      </h1>
      <p className="error-page__recomendation">{error.comment}</p>
      <Link className="error-page__link" href="/">
        На главную
      </Link>
    </PrimitivePaper>
  )
}

export default ErrorPage
