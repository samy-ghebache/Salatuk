import "./Header.css";
import Basmala from "./assets/Basmala.svg";
export default function Header() {
  return (
    <>
      <img src={Basmala} class="Basmala"></img>
      <h2>
        (102) فَإِذَا قَضَيْتُمُ الصَّلَاةَ فَاذْكُرُوا اللَّهَ قِيَامًا
        وَقُعُودًا وَعَلَىٰ جُنُوبِكُمْ ۚ فَإِذَا اطْمَأْنَنتُمْ فَأَقِيمُوا
        الصَّلَاةَ ۚ إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا
        مَّوْقُوتًا (103)
      </h2>
    </>
  );
}
