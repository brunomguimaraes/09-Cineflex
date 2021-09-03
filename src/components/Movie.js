import "../css/movie.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/cineflex/movies";

function Day(props) {
    const {
        weekday,
        date,
        showtimes
    } = props.day;

    return (
        <div className="day">
            <span>{weekday} - {date}</span>
            <div className="showtimes">
                {showtimes.map(showtime => <div className="showtime" key={showtime.id}>{showtime.name}</div>)}
            </div>
        </div>
    );

}

export function Movie() {
    const params = useParams();
    const movieURL = `${URL}/${params.idMovie}/showtimes`;
    const [movie, SetMovie] = useState([])

    useEffect(() => axios(movieURL).then((resp) => SetMovie(resp.data.days)), []);

    console.log(movie)

    return (
        <>
            <div className="top-bar">Selecione o horário</div>
            {(movie.length > 0) ? movie.map((day) => <Day day={day} key={day.id}/>) : "carregando..."}
        </>
    );
}