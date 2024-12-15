import staticLayer1 from '../picturesForHomePage/StaticLayer1.png';
import layer2 from '../picturesForHomePage/Layer2.png';
import layer3 from '../picturesForHomePage/Layer3.png';
import layer5 from '../picturesForHomePage/Layer5.png';
import staticLayer4 from '../picturesForHomePage/StaticLayer4.png';
import notes2 from '../picturesForHomePage/Notes2.png';
import pen from '../picturesForHomePage/Pen.png';
import '../style.css'

import { Header } from "../Components";
import { useEffect } from 'react';

const HomePage = () => {
    useEffect(() => {
        let text = document.getElementById('text');
        let layer5 = document.getElementById('layer5');
        let layer3 = document.getElementById('layer3');
        let layer2 = document.getElementById('layer2');
        let notes = document.getElementById('notes');
        let pen = document.getElementById('pen');

        const handleScroll = () => {
            const value = window.scrollY;
           
            text.style.marginTop = value * 2.5 + 'px';
            notes.style.top = value * -1.5 + "px";
            notes.style.left = value * 1.5 + "px";
            layer3.style.left = value * 1.5 + "px";
            layer2.style.left = value * -1.5 + "px";
            pen.style.left = value * -1.5 + "px";
            pen.style.top = value * -1.5 + "px";
            layer5.style.marginTop = value * 0.5 + 'px';
            // Вы можете добавить обработку для других элементов, если нужно
        };

        window.addEventListener('scroll', handleScroll);

        // Удаляем обработчик события при размонтировании компонента
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    return <section className = "home-page-main-content">
        <div className = "conteiner">
            <Header/>
        </div>

        <section className="parallax">
            
            <img src={layer5} alt="Layer 5" id="layer5" />
            <h2 id="text">Task-Tracker</h2>
            <img src={staticLayer4} alt="Static layer 4" id="staticLayer4" />
            <img src={layer3} alt="Layer 3" id="layer3" />
            <img src={layer2} alt="Layer 2" id="layer2" />
            <img src={staticLayer1} alt="Static layer 1" id="staticLayer1" />
            <img src={notes2} alt="Notes" id="notes" />
            <img src={pen} alt="Pen" id="pen" />
        </section>

        <section className="sec">
            <h2>О приложении</h2>
            <p>
                Данное приложение разработано в рамках учебного курса университета по дисциплине "Технология разработки программного обеспечения". Основной проект включает в себя таск-трекер с собственной базой данных и сервис авторизации, также имеющий свою базу данных. Эти сервисы регистрируются в Eureka, которая выполняет роль сервиса обнаружения (Service Discovery). Помимо этого, используется сервис APIGateway, который выступает в роли маршрутизатора и переотправляет запросы в нужные сервисы, зарегистрированные в системе. 

                Приложение реализовано с применением современных подходов и инструментов веб-разработки. Его интерфейс адаптивен и ориентирован на удобство пользователя, обеспечивая комфортную работу на различных устройствах. Структура кода организована по принципам компонентного подхода, что делает проект удобным для масштабирования и поддержки. 

                Также проект демонстрирует использование модульных стилей, позволяющих легко вносить изменения в визуальную составляющую без затрагивания логики приложения. Реализована продвинутая маршрутизация с помощью библиотеки react-router-dom, обеспечивающая переходы между страницами и корректную передачу данных. Работа с локальными медиафайлами, такими как изображения, также интегрирована, что способствует улучшению пользовательского опыта.

                Основная цель разработки этого приложения — закрепление теоретических знаний по созданию веб-приложений и их практическое применение. В процессе разработки студенты получают опыт работы с архитектурой микросервисов, взаимодействием компонентов, а также проектированием маршрутов и управлением состоянием приложения. Проект не только развивает профессиональные навыки, но и закладывает основу для дальнейшей успешной работы в области программной инженерии.
            </p>
        </section>
    </section>
}

export default HomePage;