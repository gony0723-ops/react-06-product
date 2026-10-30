import { useEffect, useState } from "react";
import styles from "./ProductList.module.css";

function ProductList() {
   // 사용자가 "/" 주소로 들어왔을때 컴포넌트 => 사용자가 목록을 보고싶어하는 상황
   // 목록을 띄워주기 위해 목록 데이터를 백엔드에게 요청
   // 받아와서 가공하고 state에 저장한 뒤
   // 화면에 띄우면 곧

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=12")
            .then((res) => {return res.json()})
            .then(json => {
                setList(json.products);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }

    // loading은 끝났고(false),
    // 백엔드에게 받아온 데이터가 정상적으로 list에 저장이 된 경우
    // fetch 중간에 에러가 있어서 list에 저장이 안 된 경우

    if (list.length === 0) {
        return <div className={styles.loading}>상품을 찾을 수 없거나, 오류가 발생되었습니다.</div>
        }

        return (
            <div className={styles.container}>
                <h1 className={styles.title}>상품 목록</h1>
                <div className={styles.listWrap}>
                    {list.map((item) => {
                        return (
                            <div key={item.id} className={styles.card}>
                            <img
                                src={item.thumball}
                                alt={item.title}
                                className={styles.thumbnail}
                            />
                            <div className={styles.info}>
                                <h3 className={styles.name}>{item.title}</h3>
                                <p className={styles.price}>${item.price}</p>
                            </div>
                        </div>
                        );
                    })}
                </div>
            </div>
        );
    }




export default ProductList;