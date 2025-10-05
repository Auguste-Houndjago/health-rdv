import VaporizeTextCycle, { Tag } from "./VaporizeTextUx"

export const VaporizeText = () => {
  return (
      <div className=' '>
          <VaporizeTextCycle
              texts={["21st.dev", "Is", "Cool"]}
              font={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "70px",
                  fontWeight: 600
              }}
              color="rgb(255,255, 255)"
              spread={5}
              density={5}
              animation={{
                  vaporizeDuration: 2,
                  fadeInDuration: 1,
                  waitDuration: 0.5
              }}
              direction="left-to-right"
              alignment="center"
              tag={Tag.H1}
              />
      </div>
  )
}
