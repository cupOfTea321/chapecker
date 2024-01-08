import PrimitivePaper from '../../components/PrimitivePaper/PrimitivePaper'
import PrimitiveButton from '../../components/PrimitiveButton/PrimitiveButton'
import './StartScreen.scss'
import { Link } from 'react-router-dom'
import ThreeDBox from '../../containers/MotionLayer/ThreeDBox'
import { protectedRoutes } from '../../constants/browserRoutes'

function StartScreen() {
  return (
    <ThreeDBox>
      <PrimitivePaper class="start-screen">
        <p>
          Выбейте все фишки соперника с поля!
          <br />
          <br />
          В свой ход:
          <br />
          1. Выберите фишку, кликнув по ней. Отменить выбор можно кликом правой
          кнопки мыши в любом месте поля.
          <br />
          2. Кликните на поле, чтобы указать направление и силу броска. Сила
          броска пропорциональна удалению от выбранной фишки
          <br />
          <br />
          Игра продолжается, пока у обоих игроков есть фишки на поле. Побеждает
          тот игрок, который сделает последний ход
        </p>
        <br />
        <div className="start-screen__start-buttons">
          <PrimitiveButton disabled>Играть с ботом!</PrimitiveButton>
          <Link to={protectedRoutes.game}>
            <PrimitiveButton>Играть вдвоем!</PrimitiveButton>
          </Link>
        </div>
      </PrimitivePaper>
    </ThreeDBox>
  )
}

export default StartScreen
