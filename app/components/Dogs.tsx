import Image from '~/components/Image'
import Divider from './Divider'
import PageHeading from './PageHeading'

type FactImage = {
    url: string
}

type FactType = {
    id: number
    fact: string
    image: FactImage[]
}

type DogProps = {
    facts: FactType[]
}

const Dogs = ({ facts }: DogProps) => {
    const filteredFact =
        facts.filter((item) => item.fact.includes('Newman'))[0] ?? []

    return (
        <div className="max-w-1064 mx-auto px-20">
            <div className="relative pb-48 mb-48">
                <PageHeading>Newman</PageHeading>

                <Divider />
            </div>

            <p className="mb-48">Newman is a 12 year old shelty mix.</p>

            {filteredFact &&
                filteredFact.image.map((image, index) => (
                    <div key={index} className="w-1/2 mb-20">
                        <div className="aspect-about">
                            <Image
                                src={image.url}
                                options={{ w: 850, h: 575 }}
                            />
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default Dogs
