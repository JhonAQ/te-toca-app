# Convenciones de codigo para el codigo QR

Los datos del QR deben ser un JSON con la siguiente estructura:

```json
{
  enterpriseName: "Banco de Crédito del Perú",
  queueName: "Operaciones y Consultas",
  peopleWaiting: 8,
  estimatedTime: "25 min",
  timePerPerson: "3 min",
  ticketNumber: "BX42",
  logoUrl: "https://example.com/logo.png",
}
```

Para reducir la cantidad de bytes que el qr tendrá que almacenar y asi mejorar la velocidad de escaneo, se usará la siguiente convención:

```json
{
  eN: "Banco de Crédito del Perú",
  qN: "Operaciones y Consultas",
  pW: 8,
  eT: "25 min",
  tPP: "3 min",
  tN: "BX42",
  lU: "https://example.com/logo.png",
}
```

Quitando espacios y demas caracteres innecesarios, el QR tendrá un tamaño de aproximadamente 100 bytes, lo que es adecuado para la mayoría de los lectores de QR.

```json
{eN: "Banco de Crédito del Perú",qN: "Operaciones y Consultas",pW: 8,eT: "25 min",tPP: "3 min",tN: "BX42",lU: "https://example.com/logo.png"}
```