from django import forms
from .models import Image


class ImageCreateForm(forms.ModelForm):
    """ Форма для сохранения объекта картинки. """

    class Meta:
        model = Image
        fields = ('title', 'url', 'description')
        widgets = {'url': forms.HiddenInput, }


def clean_url(self):
    """ Функция валидации полей формы. """
    url = self.cleaned_data['url']
    valid_extensions = ['jpg', 'jpeg']
    extension = url.rsplit('.', 1)[1].lower()
    if extension not in valid_extensions:
        raise forms.ValidationError('The given URL does not ' 'match valid image extensions.')
    return url
