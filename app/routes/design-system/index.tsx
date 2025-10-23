import Divider from '~/components/Divider'
import Loader from '~/components/Loader'
import Pagination from '~/components/Pagination'
import useMetaData from '~/hooks/use-meta-data'

export const meta = () => {
    return useMetaData({
        title: 'Design System',
    })
}

export default function DesignSystemIndex() {
    return (
        <div className="max-w-768 mx-auto px-20">
            <div className="relative pb-48 mb-48">
                <time
                    dateTime="2022-05-31"
                    className="block mb-24 text-sm tracking-wider text-right"
                >
                    01.19.2023
                </time>

                <h1 className="text-xl md:text-jb leading-snug font-serif  antialiased">
                    Here is the Design System for this really great site
                </h1>

                <Divider />
            </div>

            <div className="text -long">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                </p>

                <h2>
                    2: Gravida dictum fusce ut placerat orci nulla pellentesque
                    dignissim enim
                </h2>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ipsum consequat nisl vel pretium lectus quam. Sit
                    amet nisl purus in mollis nunc sed. Nibh venenatis cras sed
                    felis eget velit aliquet sagittis.
                </p>

                <hr />

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                </p>

                <pre>ReferenceError: window is not defined</pre>

                <p>
                    <strong>Nec tincidunt praesent</strong> semper feugiat.{' '}
                    <em>Lacinia quis vel eros</em> donec ac odio. Facilisis
                    magna etiam tempor orci. Et egestas quis ipsum suspendisse
                    ultrices. Lobortis scelerisque{' '}
                    <a href="#TODO">fermentum dui faucibus in</a>. Pharetra sit
                    amet aliquam id. Vitae proin sagittis nisl rhoncus.
                </p>

                <blockquote>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Lorem ipsum dolor sit amet.
                </blockquote>

                <h3>3: Id donec ultrices tincidunt arcu non sodales neque</h3>

                <p>
                    Risus ultricies tristique nulla aliquet enim tortor at
                    auctor urna. Leo urna molestie at elementum. Turpis massa
                    sed elementum tempus egestas sed.
                </p>

                <figure>
                    <img
                        src="//assets.trevor-davis.com/uploads/images/content/blog-section-preview-target.png"
                        data-image="2283"
                        alt="Setting the preview target in my Blog Section"
                    />
                </figure>

                <h4>
                    4: Suspendisse faucibus interdum posuere lorem ipsum dolor
                    sit amet consectetur adipiscing elit
                </h4>

                <p>
                    Massa sapien faucibus et molestie ac feugiat. Posuere morbi
                    leo urna molestie at elementum eu facilisis. Rutrum tellus
                    pellentesque eu tincidunt tortor aliquam. Tellus at urna
                    condimentum mattis pellentesque id.
                </p>

                <video
                    src="//assets.trevor-davis.com/uploads/images/content/live-preview.mp4"
                    loop
                    muted
                    controls
                    width="100%"
                ></video>

                <h2>Vel quam elementum pulvinar etiam non quam lacus</h2>

                <ul>
                    <li>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    </li>
                    <li>
                        Sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </li>
                </ul>

                <h2>Ipsum dolor sit amet consectetur adipiscing elit duis</h2>

                <ol>
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>
                        Consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt
                    </li>
                    <li>Ut labore et dolore magna aliqua.</li>
                </ol>
            </div>

            <div className="relative h-64 my-40">
                <Loader />
            </div>

            <ol className="forms">
                <li className="field">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        autoCapitalize="off"
                        autoCorrect="off"
                        autoComplete="email"
                        required
                    />
                </li>

                <li className="field">
                    <textarea name="message" id="message" required></textarea>
                </li>

                <li className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-200 border-2 border-blue-200 text-blue-400 leading-none py-10 px-20 rounded-md antialiased font-medium transition-all duration-200 hover:bg-blue-400 hover:text-blue-100 hover:rounded-xl"
                        data-form-target="button"
                    >
                        Send
                    </button>
                </li>
            </ol>

            <div className="my-40">
                <Pagination currentPage={2} totalResults={40} />
            </div>
        </div>
    )
}
