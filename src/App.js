import React from 'react';
import './App.css';

class App extends React.Component {

  state = {
    jumlahPembayaran: '',
    buruh: [
      {
        id: 1,
        name: "Buruh A",
        percentage: 0,
        pembayaran: 0
      },
      {
        id: 2,
        name: "Buruh B",
        percentage: 0,
        pembayaran: 0
      },
      {
        id: 3,
        name: "Buruh C",
        percentage: 0,
        pembayaran: 0
      }
    ],
    inputValue: 0,
    selectedId: 0
  }

  onTotalBonusUpdate = (value) => {
    this.setState({ jumlahPembayaran: value})
    this.inputPercentage()
  }

  eventHandler = async (id, value) => {
    await this.setState({ inputValue: value, selectedId: id })
    this.inputPercentage()
  }

  inputPercentage = async () => {
    let { inputValue, selectedId } = this.state
    const newValue = inputValue
    await this.setState(state => {
      const percentage = state.buruh.map((val, index) => {
        if (val.id === selectedId) {
          val.percentage = newValue
        }
      })
      return{
        percentage
      }
    })
    console.log(this.state.buruh)
      this.countTotalPembayaran()
  }

  countTotalPembayaran = () => {
    let { jumlahPembayaran } = this.state
    this.setState(state => {
      const pembayaran = state.buruh.map((val) => {
        if (val.percentage != 0) {
          val.pembayaran = parseInt(jumlahPembayaran) * val.percentage / 100
        }
      })
      return{
        pembayaran
      }
      })
      console.log(this.state.buruh)
  }

  renderBuruh = () => {
    let { buruh } = this.state
    return buruh.map((val, index) => {
      return (
        <tbody>
          <tr>
            <td>
              <div className="buruh-name">{val.name}</div></td>
            <td>
              <input 
                type="number" 
                value={val.percentage} 
                onChange={(e) => this.eventHandler(val.id, e.target.value)}
                className="input-percentage"
              /> %
            </td>
          </tr>
        </tbody>
      )
    })
  }

  renderPembayaranBuruh = () => {
    let { buruh } = this.state
    return buruh.map((val, index) => {
      return (
        <tbody>
          <tr>

            <td>
            <div className="pembayaran-style">
              {val.name}
              </div>
            </td>
            <td>
              <div className="pembayaran-result">

              {isNaN(val.pembayaran)
                ?
                `Rp. 0`
                :
                `Rp.` + val.pembayaran
              }
              </div>
            </td>
          </tr>
        </tbody>
      )
    })
  }

  onBtnTambah = async () => {
    let { buruh } = this.state
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    let newArr = [...buruh]
    let id = buruh.length + 1
    let name = `Buruh ${alphabet[id]}`
    let percentage = 0
    let pembayaran = 0
    newArr.push({
      id,
      name,
      percentage,
      pembayaran
    })
    this.setState({ buruh: newArr })
  }

  onBtnHapus = () => {
    let { buruh } = this.state
    if (buruh.length <= 3) {
      return alert("Error! Minimal 3 Orang Buruh")
    }
    let newArr = [...buruh]
    newArr.pop()
    this.setState({ buruh: newArr })
  }

  onBtnSimpan = () => {
    let { buruh } = this.state
    var output = 0
    console.log(buruh)
    for (var i = 0; i < buruh.length; i++) {
      if (buruh[i].percentage == 0) {
        return alert('Error! 1 Pembagian bonus masih salah')
      }
      output = output + parseInt(buruh[i].percentage)
    }
    console.log(output)
    if (output !== 100) {
      return alert('Error! Pembagian bonus masih salah')
    }
    alert('Selamat! Data berhasil disimpan ke database')
    this.setState(state => {
      const percentage = state.buruh.map((val) => {
        val.percentage = 0
        val.pembayaran = 0
      })
      return {
        percentage,
        jumlahPembayaran: ''
      }
    })
  }

  render() {
    let { jumlahPembayaran } = this.state
    return (
      <div className="container">
        <div style={{ marginBottom: "1rem"}}>
          Pembayaran Rp. <input type="number" value={jumlahPembayaran} placeholder="Dalam rupiah" onChange={(e) => this.onTotalBonusUpdate(e.target.value)} style={{ height: "2rem"}}/>
        </div>
        <table>
          {this.renderBuruh()}
        </table>
        <input className="button" type="button" value="Tambah" onClick={this.onBtnTambah}/>
        <input className="button" type="button" value="Hapus" onClick={this.onBtnHapus}/>
        <input className="button" type="button" value="Simpan" onClick={this.onBtnSimpan}/>
        <table>
          {this.renderPembayaranBuruh()}
        </table>
      </div>
    )
  }
}

export default App;
