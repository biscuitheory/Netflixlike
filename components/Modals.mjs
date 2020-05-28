export default function Modals(props) {
    return `
    <div class="container-modal">
        <div class="container-linear">
            <div class="containerInfo">
                <h3>${props.original_title || props.original_name}</h3>
                <p> <span class="rating">Rating ${props.vote_average * 10}%</span> Release Date: ${props.release_date || props.first_air_date} Runtime: ${props.runtime || props.episode_run_time[0]}m</p>
                <p class="paraDescription">${props.overview}</p>
                    <div class="containerButtons">
                        <button id="buttonPlay"><i class="fas fa-play"></i>Play</button>
                        <button id="buttonPlus"><i class="fas fa-plus"></i>My List</button>
                    </div>
                </div>
            </div>
        <span class="buttonCross"><i class="fas fa-times fa-2x"></i></span>
        </div>
    </div>`
}