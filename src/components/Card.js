import {
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Card,
  Icon,
  Image,
} from 'semantic-ui-react'

const CardItem = ({ onClick, content }) => (
  <Card onClick={onClick} style={{cursor: "pointer"}}>
    <Image src={content.image} wrapped ui={false} />
    <CardContent>
      <CardHeader>{content.header}</CardHeader>
      <CardMeta>
        <span className='date'>Built in 2025</span>
      </CardMeta>
      <CardDescription>
        {content.description}
      </CardDescription>
    </CardContent>
  </Card>
)

export default CardItem;