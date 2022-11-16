import Image from '~/components/Image'

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
                <h1 className="text-jb text-purple">Newman</h1>

                <div className="absolute left-0 bottom-0 h-2 w-120 bg-blue-600"></div>
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
