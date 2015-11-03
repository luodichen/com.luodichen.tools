from django.template import Context, loader
from django.http.response import HttpResponse

# Create your views here.

def index(request):
    template = loader.get_template('index.html')
    context = Context({
    })
    
    return HttpResponse(template.render(context))
