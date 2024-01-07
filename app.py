from flask import Flask, render_template
import speedtest

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/medir_velocidad')
def medir_velocidad():
    # Implementar la lógica para medir la velocidad con speedtest-cli
    st = speedtest.Speedtest()
    velocidad_descarga = st.download() / 1_000_000  # Velocidad de descarga en Mbps

    return str(velocidad_descarga)

if __name__ == '__main__':
    app.run(debug=True)
