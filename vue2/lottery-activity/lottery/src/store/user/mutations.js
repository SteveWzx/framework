export default {
  changeNewUserState (state) {
    state.new = false
  },
  getUserQrCode (state, { qr }) {
    state.qr = qr
  },
  getUserId (state, { id }) {
  	state.id = id
  },
  getUserRtimes (state, { rtimes }) {
  	state.rtimes = rtimes
  }
}