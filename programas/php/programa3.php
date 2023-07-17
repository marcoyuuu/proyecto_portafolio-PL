<?php
function areaCirculo($radio) {
  return pi() * pow($radio, 2);
}

echo areaCirculo(5); // Output: 78.53981633974483
?>